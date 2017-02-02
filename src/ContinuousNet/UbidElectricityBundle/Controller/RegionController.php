<?php

namespace ContinuousNet\UbidElectricityBundle\Controller;

use ContinuousNet\UbidElectricityBundle\Entity\Region;
use ContinuousNet\UbidElectricityBundle\Form\RegionType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Region Controller
 * 
 * Manage Regions 
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
 * @see		RegionController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/region")
 */
class RegionController extends BaseController
{
	/**
	 * Lists all Region entities.
	 *
	 * @Route("/", name="region_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$regions = $em->getRepository('UbidElectricityBundle:Region')->findAll();

		return $this->render('UbidElectricityBundle:Region:index.html.twig', array(
			'regions' => $regions,
		));
	}

	/**
	 * Creates a new Region entity.
	 *
	 * @Route("/new", name="region_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$region = new Region();
		$form = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\RegionType', $region);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($region);
			$em->flush();

			return $this->redirectToRoute('region_show', array('id' => $region->getId()));
		}

		return $this->render('UbidElectricityBundle:Region:new.html.twig', array(
			'region' => $region,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a Region entity.
	 *
	 * @Route("/{id}", name="region_show")
	 * @Method("GET")
	 */
	public function showAction(Region $region)
	{
		$deleteForm = $this->createDeleteForm($region);

		return $this->render('UbidElectricityBundle:Region:show.html.twig', array(
			'region' => $region,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing Region entity.
	 *
	 * @Route("/{id}/edit", name="region_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, Region $region)
	{
		$deleteForm = $this->createDeleteForm($region);
		$editForm = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\RegionType', $region);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($region);
			$em->flush();

			return $this->redirectToRoute('region_edit', array('id' => $region->getId()));
		}

		return $this->render('UbidElectricityBundle:Region:edit.html.twig', array(
			'region' => $region,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a Region entity.
	 *
	 * @Route("/{id}", name="region_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, Region $region)
	{
		$form = $this->createDeleteForm($region);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($region);
			$em->flush();
		}

		return $this->redirectToRoute('region_index');
	}

	/**
	 * Creates a form to delete a Region entity.
	 *
	 * @param Region $region The Region entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(Region $region)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('region_delete', array('id' => $region->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
