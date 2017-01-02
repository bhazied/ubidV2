<?php

namespace ContinuousNet\UbidElectricityBundle\Controller;

use ContinuousNet\UbidElectricityBundle\Entity\TenderBookmark;
use ContinuousNet\UbidElectricityBundle\Form\TenderBookmarkType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Tender Bookmark Controller
 * 
 * Manage TenderBookmarks 
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
 * @see		TenderBookmarkController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/tenderbookmark")
 */
class TenderBookmarkController extends BaseController
{
	/**
	 * Lists all TenderBookmark entities.
	 *
	 * @Route("/", name="tenderbookmark_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$tenderBookmarks = $em->getRepository('UbidElectricityBundle:TenderBookmark')->findAll();

		return $this->render('UbidElectricityBundle:TenderBookmark:index.html.twig', array(
			'tenderBookmarks' => $tenderBookmarks,
		));
	}

	/**
	 * Creates a new TenderBookmark entity.
	 *
	 * @Route("/new", name="tenderbookmark_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$tenderBookmark = new TenderBookmark();
		$form = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\TenderBookmarkType', $tenderBookmark);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($tenderBookmark);
			$em->flush();

			return $this->redirectToRoute('tenderbookmark_show', array('id' => $tenderBookmark->getId()));
		}

		return $this->render('UbidElectricityBundle:TenderBookmark:new.html.twig', array(
			'tenderBookmark' => $tenderBookmark,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a TenderBookmark entity.
	 *
	 * @Route("/{id}", name="tenderbookmark_show")
	 * @Method("GET")
	 */
	public function showAction(TenderBookmark $tenderBookmark)
	{
		$deleteForm = $this->createDeleteForm($tenderBookmark);

		return $this->render('UbidElectricityBundle:TenderBookmark:show.html.twig', array(
			'tenderBookmark' => $tenderBookmark,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing TenderBookmark entity.
	 *
	 * @Route("/{id}/edit", name="tenderbookmark_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, TenderBookmark $tenderBookmark)
	{
		$deleteForm = $this->createDeleteForm($tenderBookmark);
		$editForm = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\TenderBookmarkType', $tenderBookmark);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($tenderBookmark);
			$em->flush();

			return $this->redirectToRoute('tenderbookmark_edit', array('id' => $tenderBookmark->getId()));
		}

		return $this->render('UbidElectricityBundle:TenderBookmark:edit.html.twig', array(
			'tenderBookmark' => $tenderBookmark,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a TenderBookmark entity.
	 *
	 * @Route("/{id}", name="tenderbookmark_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, TenderBookmark $tenderBookmark)
	{
		$form = $this->createDeleteForm($tenderBookmark);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($tenderBookmark);
			$em->flush();
		}

		return $this->redirectToRoute('tenderbookmark_index');
	}

	/**
	 * Creates a form to delete a TenderBookmark entity.
	 *
	 * @param TenderBookmark $tenderBookmark The TenderBookmark entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(TenderBookmark $tenderBookmark)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('tenderbookmark_delete', array('id' => $tenderBookmark->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
