<?php

namespace ContinuousNet\UbidElectricityBundle\Controller;

use ContinuousNet\UbidElectricityBundle\Entity\Tender;
use ContinuousNet\UbidElectricityBundle\Form\TenderType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Tender Controller
 * 
 * Manage Tenders 
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
 * @see		TenderController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/tender")
 */
class TenderController extends BaseController
{
	/**
	 * Lists all Tender entities.
	 *
	 * @Route("/", name="tender_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$tenders = $em->getRepository('UbidElectricityBundle:Tender')->findAll();

		return $this->render('UbidElectricityBundle:Tender:index.html.twig', array(
			'tenders' => $tenders,
		));
	}

	/**
	 * Creates a new Tender entity.
	 *
	 * @Route("/new", name="tender_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$tender = new Tender();
		$form = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\TenderType', $tender);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($tender);
			$em->flush();

			return $this->redirectToRoute('tender_show', array('id' => $tender->getId()));
		}

		return $this->render('UbidElectricityBundle:Tender:new.html.twig', array(
			'tender' => $tender,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a Tender entity.
	 *
	 * @Route("/{id}", name="tender_show")
	 * @Method("GET")
	 */
	public function showAction(Tender $tender)
	{
		$deleteForm = $this->createDeleteForm($tender);

		return $this->render('UbidElectricityBundle:Tender:show.html.twig', array(
			'tender' => $tender,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing Tender entity.
	 *
	 * @Route("/{id}/edit", name="tender_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, Tender $tender)
	{
		$deleteForm = $this->createDeleteForm($tender);
		$editForm = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\TenderType', $tender);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($tender);
			$em->flush();

			return $this->redirectToRoute('tender_edit', array('id' => $tender->getId()));
		}

		return $this->render('UbidElectricityBundle:Tender:edit.html.twig', array(
			'tender' => $tender,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a Tender entity.
	 *
	 * @Route("/{id}", name="tender_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, Tender $tender)
	{
		$form = $this->createDeleteForm($tender);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($tender);
			$em->flush();
		}

		return $this->redirectToRoute('tender_index');
	}

	/**
	 * Creates a form to delete a Tender entity.
	 *
	 * @param Tender $tender The Tender entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(Tender $tender)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('tender_delete', array('id' => $tender->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
