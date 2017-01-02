<?php

namespace ContinuousNet\UbidElectricityBundle\Controller;

use ContinuousNet\UbidElectricityBundle\Entity\Sector;
use ContinuousNet\UbidElectricityBundle\Form\SectorType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Sector Controller
 * 
 * Manage Sectors 
 * 
 * PHP version 5.4.4
 * 
 * @category   Symfony 2 Controller
 * @package	ContinuousNet\UbidElectricityBundle\Controller
 * @author	 Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2017 CONTINUOUS NET
 * @license	CONTINUOUS NET REGULAR LICENSE
 * @version	Release: 1.0
 * @link	   http://ubidelectricity.continuousnet.com/ContinuousNet/UbidElectricityBundle/Controller
 * @see		SectorController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/sector")
 */
class SectorController extends BaseController
{
	/**
	 * Lists all Sector entities.
	 *
	 * @Route("/", name="sector_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$sectors = $em->getRepository('UbidElectricityBundle:Sector')->findAll();

		return $this->render('UbidElectricityBundle:Sector:index.html.twig', array(
			'sectors' => $sectors,
		));
	}

	/**
	 * Creates a new Sector entity.
	 *
	 * @Route("/new", name="sector_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$sector = new Sector();
		$form = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\SectorType', $sector);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($sector);
			$em->flush();

			return $this->redirectToRoute('sector_show', array('id' => $sector->getId()));
		}

		return $this->render('UbidElectricityBundle:Sector:new.html.twig', array(
			'sector' => $sector,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a Sector entity.
	 *
	 * @Route("/{id}", name="sector_show")
	 * @Method("GET")
	 */
	public function showAction(Sector $sector)
	{
		$deleteForm = $this->createDeleteForm($sector);

		return $this->render('UbidElectricityBundle:Sector:show.html.twig', array(
			'sector' => $sector,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing Sector entity.
	 *
	 * @Route("/{id}/edit", name="sector_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, Sector $sector)
	{
		$deleteForm = $this->createDeleteForm($sector);
		$editForm = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\SectorType', $sector);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($sector);
			$em->flush();

			return $this->redirectToRoute('sector_edit', array('id' => $sector->getId()));
		}

		return $this->render('UbidElectricityBundle:Sector:edit.html.twig', array(
			'sector' => $sector,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a Sector entity.
	 *
	 * @Route("/{id}", name="sector_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, Sector $sector)
	{
		$form = $this->createDeleteForm($sector);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($sector);
			$em->flush();
		}

		return $this->redirectToRoute('sector_index');
	}

	/**
	 * Creates a form to delete a Sector entity.
	 *
	 * @param Sector $sector The Sector entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(Sector $sector)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('sector_delete', array('id' => $sector->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
